import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";

const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:5000/connect`);
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((prev) => [message, ...prev]);
    };
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className="center">
      <div className="header">
        <h4>Ход торгов</h4>
      </div>
      <div>
        <p>
          Уажаемые участники, во время вашего хода вы можете изменить параметры
          торгов, указанных в таблице:
        </p>
        <Countdown date={Date.now() + 120000} />
        <table>
          <thead>
            <tr>
              <th>Параметры и требования</th>
              <th>
                <Countdown date={Date.now() + 120000} />  
                Пользователь №1
              </th>
              <th>Пользователь №2</th>
              <th>Пользователь №3</th>
              <th>Пользователь №4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Наличие комплекса мероприятий, повышвющих стандарты качества изготовления</td>
              <td>Томаты свежие</td>
              <td>кг</td>
              <td>15,20</td>
              <td>69,00</td>
              <td>1048,80</td>
            </tr>
            <tr>
              <td>Срок изготовления лота, дней</td>
            </tr>
            <tr>
              <td>Гарантийные обязательства, мес</td>
            </tr>
            <tr>
              <td>Условия оплаты</td>
            </tr>
            <tr>
              <td>Стоимость изготовления лота, руб (без НДС)</td>
            </tr>
            <tr>
              <td>Действия</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventSourcing;

// {
//     name: "Параметры и требования",
//     improvementMeasures: "Наличие комплекса мероприятий, повышвющих стандарты качества изготовления",
//     productionTime: "Срок изготовления лота, дней",
//     warrantyObligations: "Гарантийные обязательства, мес",
//     paymentTerms: "Условия оплаты",
//     manufacturingCost: "Стоимость изготовления лота, руб (без НДС)",
//     actions: "Действия"
//   }