import { PaymentInterface } from "../../interfaces/IPayment";

const apiUrl = "http://localhost:8000";

async function GetPayments() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/payments`, requestOptions).then((res) => {
    if (res.status == 200) {
      return res.json();
    } else {
      return false;
    }
  });

  return res;
}

async function GetPriceById(id: number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  const res = await fetch(`${apiUrl}/course-price/${id}`, requestOptions).then(
    (res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    }
  );

  return res;
}

async function GetTitleById(id: number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  const res = await fetch(`${apiUrl}/course-title/${id}`, requestOptions).then(
    (res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    }
  );

  return res;
}

async function CreatePayment(data: PaymentInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/payment`, requestOptions).then((res) => {
    if (res.status == 201) {
      return res.json();
    } else {
      return false;
    }
  });

  return res;
}

export { GetPayments, GetPriceById, GetTitleById, CreatePayment };
