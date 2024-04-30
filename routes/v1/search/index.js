import express from "express";
const router = express.Router();

router.get("/:query", (req, res) => {
  payload = [
    {
      name: "Some product",
      description: "some description",
      price: 3020,
      image: "#",
      gender: "Male",
    },
    {
      name: "Some product",
      description: "some description",
      price: 3020,
      image: "#",
      gender: "Male",
    },
    {
      name: "Some product",
      description: "some description",
      price: 3020,
      image: "#",
      gender: "Female",
    },
    {
      name: "Some product",
      description: "some description",
      price: 3020,
      image: "#",
      gender: "Male",
    },
    {
      name: "Some product",
      description: "some description",
      price: 3020,
      image: "#",
      gender: "Female",
    },
  ];
  res.sendStatus(200);
  res.send();
});

export default router;
