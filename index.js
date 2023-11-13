import express from "express";
import fs from "fs";
import joi from "joi";

const app = express();
const PORT = 3000;
const database = './database/db.json';
const data = JSON.parse(fs.readFileSync(database));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleServerError = (res) => {
  return res.status(500).json({ message: 'Internal server error' })
};

const handleClientError = (res, status, message) => {
  return res.status(status).json({ message });
}

app.get("/", (req, res) => {
  res.send("Hello, express-backend's client!");
});

app.get('/products', (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const filteredData = data["products"].filter((el) => el.id === parseInt(id, 10));
      if (filteredData.length === 0) {
        return handleClientError(res, 404, "Data Not Found");
      }
      return res.status(200).json({ data: filteredData[0], status: 'Success' });

    } else {
      // Get all data
      return res.status(200).json({ data: data["products"], status: 'Success' });
    }
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
});

app.post('/products', (req, res) => {
  try {
    const newData = req.body;

    const scheme = joi.object({
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      quantity_in_stock: joi.number(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }
    
    if (data.products.find((el) => el.name.toLowerCase() === newData.name.toLowerCase())) {
      return handleClientError(res, 400, "Data with this name already existed");
    }

    const newLastID = data.products[data.products.length - 1]["id"] + 1;

    const newCompleteData = {id: newLastID, quantity_in_stock: 0, ...newData};
    data["products"].push(newCompleteData);
    fs.writeFileSync(database, JSON.stringify(data));
    return res.status(201).json({ data: newCompleteData, status: 'Success' });

  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
})

app.put('/products/:id', (req, res) => {
  try {
    const { id } = req.params;

    const dataRequest = req.body;

    const scheme = joi.object({
      name: joi.string(),
      description: joi.string(),
      price: joi.number(),
    });

    const { error } = scheme.validate(dataRequest);
    if (error) {
      res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const parsedID = parseInt(id, 10);
    const dataToBeChanged = data["products"].find((el) => el.id === parsedID);
    if (!dataToBeChanged) {
      return handleClientError(res, 404, "Data Not Found");
    }

    const filteredData = data["products"].filter((el) => el.id !== parsedID);
    if (dataRequest.name) {
      if (filteredData.find((el) => el.name.toLowerCase() === dataRequest.name.toLowerCase())) {
        return handleClientError(res, 400, "Data with this name already existed");
      }
    }

    const changedData = {...dataToBeChanged, ...dataRequest};
    filteredData.push(changedData);
    const newOrderedData = orderData(filteredData);
    data["products"] = newOrderedData;
    fs.writeFileSync(database, JSON.stringify(data));
    return res.status(200).json({ data: changedData, status: 'Success' });

  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
})

app.delete('/products/:id', (req, res) => {
  try {
    const { id } = req.params;

    const parsedID = parseInt(id, 10)
    if (!data["products"].find((el) => el.id === parsedID)) {
      return handleClientError(res, 404, 'Data Not Found');
    }

    const filteredData = data["products"].filter((el) => el.id !== parsedID);
    data["products"] = filteredData;

    fs.writeFileSync(database, JSON.stringify(data));
    return res.status(200).json({ data: filteredData, status: 'Success' });

  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})

const orderData = (data) => {
  // The items are sorted from the the lowest ID to the largest ID
  const customCompare = (a, b) => {
    if (a.id === b.id) {
      return 0;
    } else {
      return a.id > b.id ? 1 : -1;
    }
  }

  data.sort(customCompare)
  return data;
}