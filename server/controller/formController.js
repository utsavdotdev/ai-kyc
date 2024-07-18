import Form from "../model/form.schema.js";
import { nanoid } from "nanoid";

export const createForm = async (req, res) => {
  const { formName, orgName, userId } = req.body;

  const newForm = new Form({
    formName,
    orgName,
    userId,
  });
  try {
    const uniqueLink =
      `http://localhost:5173/userform/${orgName}-${newForm._id}`
        .toLowerCase()
        .replace(/\s+/g, "-");

    newForm.link = uniqueLink;
    await newForm.save();

    res.status(201).json({
      message: "Form Created",
      form: newForm,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getForms = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  // get the forms of the user or org
  try {
    const forms = await Form.find({ userId });
    console.log(forms);
    res.status(200).json(forms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkURL = async (req, res) => {
  const { id } = req.body;

  try {
    const form = await Form.find({ _id: id });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    } else {
      res.status(200).json({ message: "Form found", form });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
