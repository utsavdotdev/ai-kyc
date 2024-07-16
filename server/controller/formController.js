import Form from "../model/form.schema.js";
import { nanoid } from "nanoid";

export const createForm = async (req, res) => {
  const { formName, orgName, userId } = req.body;

  try {
    const uniqueLink = `http://localhost:5173/userform/${orgName}-${nanoid(10)}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    const newForm = new Form({
      formName,
      orgName,
      userId,
      link: uniqueLink,
    });

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
