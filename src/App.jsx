import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(id) {
    fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((dataRes) => {
        if (dataRes.message == "Mahsulot muvaffaqiyatli o'chirildi") {
          let copied = JSON.parse(JSON.stringify(data));
          copied = copied.filter((el) => {
            return el.id != id;
          });
          console.log(copied);
          setData(copied);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <table className="rounded-xl">
        <tr>
          <th>No</th>
          <th>Nomi</th>
          <th>Narhi</th>
          <th>Izoh</th>
          <th>Amallar</th>
        </tr>
        {data.map((phone, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{phone.name}</td>
              <td>{phone.price}</td>
              <td>{phone.description}</td>
              <td>
                <button
                  className="bg-red-600 p-2 rounded-xl text-white"
                  onClick={() => {
                    handleDelete(phone.id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default App;
