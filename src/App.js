import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";

import { Hourglass } from "./SVG/Hourglass";

import "./app.css";

function App() {
  const [timer, setTimer] = useState();

  useEffect(() => {
    subscribe();
    getTime();
  }, []);

  const getTime = async () => {
    await axios
      .get("http://localhost:5000/get-time")
      .then(({ data }) => {
        setTimer(data);
      })
      .catch((e) => console.log(e));
  };

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:5000/connect`);
    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setTimer(data);
    };
  };

  return (
    <div className="center">
      <div>
        <h2 className="title">Ход торгов</h2>
        <div className="line"></div>
        <p className="red-text">
          Уажаемые участники, во время вашего хода вы можете изменить параметры
          торгов, указанных в таблице:
        </p>
        <table>
          <thead>
            <tr>
              <th>Параметры и требования</th>
              <th>
                <div className="head-th">
                  {timer?.user === "user1" ? (
                    <div className="timer-container">
                      <Countdown date={Date.now() + timer.time} />
                      <Hourglass />
                    </div>
                  ) : null}
                  Пользователь №1
                </div>
              </th>
              <th>
                <div className="head-th">
                  {timer?.user === "user2" ? (
                    <div className="timer-container">
                      <Countdown date={Date.now() + timer.time} />
                      <Hourglass />
                    </div>
                  ) : null}
                  Пользователь №2
                </div>
              </th>
              <th>
                <div className="head-th">
                  {timer?.user === "user3" ? (
                    <div className="timer-container">
                      <Countdown date={Date.now() + timer.time} />
                      <Hourglass />
                    </div>
                  ) : null}
                  Пользователь №3
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Наличие комплекса мероприятий, повышвющих стандарты качества
                изготовления
              </td>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
            <tr>
              <td>Срок изготовления лота, дней</td>
              <th>80</th>
              <th>85</th>
              <th>87</th>
            </tr>
            <tr>
              <td>Гарантийные обязательства, мес</td>
              <th>24</th>
              <th>24</th>
              <th>24</th>
            </tr>
            <tr>
              <td>Условия оплаты</td>
              <th>30%</th>
              <th>35%</th>
              <th>40%</th>
            </tr>
            <tr>
              <td>Стоимость изготовления лота, руб (без НДС)</td>
              <th>
                <p>3,700,000 руб</p>
                <p>-25,000 руб</p>
                <p>2,475,000 руб</p>
              </th>
              <th>
                <p>3,300,000 руб</p>
                <p>-27,000 руб</p>
                <p>2,975,000 руб</p>
              </th>
              <th>
                <p>3,000,000 руб</p>
                <p>-30,000 руб</p>
                <p>2,335,000 руб</p>
              </th>
            </tr>
            <tr>
              <td>Действия</td>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
