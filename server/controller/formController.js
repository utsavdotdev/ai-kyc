import Form from "../model/form.schema.js";
import { nanoid } from "nanoid";

export const createForm = async (req, res) => {
  const { formName, orgName, orgId } = req.body;

  try {
    const uniqueLink = `http://localhost:5173/userform/${orgName}-${nanoid(10)}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    const newForm = new Form({
      formName,
      orgName,
      orgId,
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
