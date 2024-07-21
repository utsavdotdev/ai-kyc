import Form from "../model/form.schema.js";
import FilledUser from "../model/filleduser.schema.js";
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
      `http://localhost:5173/userform/${formName}-${newForm._id}`
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
    console.log(form);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    } else {
      res.status(200).json({ message: "Form found", form });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const { formId } = req.params;
  const form = await Form.find({ _id: formId });
  try {
    await Form.updateOne(
      {
        _id: formId,
      },

      {
        $set: {
          status: !form[0].status,
        },
      }
    );
    res.status(200).json({ message: "Form status updated" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  const { formId } = req.params;
  try {
    await Form.deleteOne({ _id: formId });
    res.status(200).json({ message: "Form Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInsights = async (req, res) => {
  const { userId } = req.params;
  const forms = await Form.find({ userId: userId });
  try {
    const formCount = forms.length;
    const activeForms = forms.filter((form) => form.status === true).length;
    const inactiveForms = formCount - activeForms;

    //get the no of user who have filled the form
    let userCount = 0;
    forms.forEach((form) => {
      userCount += form.users.length;
    });

    let verifiedUsers = 0;
    let rejectedUsers = 0;
    forms.forEach((form) => {
      form.users.forEach(async (user) => {
        const filledUser = await FilledUser.find({ _id: user });
        if (filledUser[0].status === "verified") {
          verifiedUsers++;
        } else if (filledUser[0].status === "rejected") {
          rejectedUsers++;
        }
      });
    });
    let latestUsers = [];
    const userPromises = forms.flatMap((form) =>
      form.users.map(async (user) => {
        const filledUser = await FilledUser.find({ _id: user });
        return {
          name:
            filledUser[0].details.personalDetail.firstName +
            " " +
            filledUser[0].details.personalDetail.lastName,
          status: filledUser[0].status, 
          email: filledUser[0].details.personalDetail.email,
        };
      })
    );

    Promise.all(userPromises).then((filledUsers) => {
      latestUsers = filledUsers.slice(0, 5); 
      const insights = {
        formCount,
        activeForms,
        inactiveForms,
        userCount,
        verifiedUsers,
        rejectedUsers,
        latestUsers,
      };

      res.status(200).json({
        message: "Insights fetched",
        insights,
      });
    });
   
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
