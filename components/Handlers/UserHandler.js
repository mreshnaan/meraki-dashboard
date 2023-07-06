import { toast } from "react-hot-toast";

export const handleUserCreate = async (values, refetch, close, jwt) => {
  console.log(values);
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        role: values.role,
      }),
    });
    if (response.ok) {
      // const data = await response.json();
      toast.success("Successfully Created");
      refetch();
    } else {
      const error = await response.json();
      throw new Error(error.data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
  close();
};

export const handleUserUpdate = async (values, refetch, close, jwt) => {
  console.log(values);
};

export const handleUserDelete = async (values, refetch, close, jwt) => {
  console.log(values);
};
