import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import socketDispatcher from "./socketDispatcher";

const StatusConsole = (props) => {
  const { expId } = useParams();
  const { route } = useParams();
  const dispatch = useDispatch();
  const trainingRoutes = ["data", "variable", "model"];
  const [notifications, setNotifications] = useState([]);

  const notificationEndRef = useRef(null);
  var webSocket;

  const scrollToBottom = () => {
    if (notificationEndRef && notificationEndRef.current) {
      notificationEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    const socket_url = `${process.env.REACT_APP_SOCKET_URL}/ws/console/${expId}/`;
    let response;

    webSocket = socket_url ? new WebSocket(socket_url) : "";

    webSocket &&
      (webSocket.onopen = () => {
        console.log("Connected");
        // toast.info("Websocket Connected");
      });

    webSocket &&
      (webSocket.onmessage = async (event) => {
        response = await JSON.parse(event.data);
        if (response.value.type === "send_log") {
          setNotifications((prevState) => [...prevState, response.value.data]);
          scrollToBottom();
        }
        //proccess data work start from here
        if (response.value.type === "send_output")
          socketDispatcher(
            response.value.data,
            () =>
              props.getVariableStats(
                expId,
                response.value.data.output,
                "",
                "",
                route
              ),
            trainingRoutes.includes(route)
          );
        if (response.value.type === "send_action")
          if (response.value.data.action === "loader_start") {
            dispatch({
              type: "SET_SOCKET_LOADER",
            });
          }
        if (response.value.data.action === "loader_end") {
          dispatch({
            type: "REMOVE_SOCKET_LOADER",
          });
        }
        if (response.value.type === "send_error") {
          toast.error(response.value.data.message);
        }
      });

    webSocket &&
      (webSocket.onclose = () => {
        webSocket.close();
        console.log("Web Socket disconnected");
        // toast.info("Web Socket disconnected");
      });

    webSocket &&
      (webSocket.onerror = function (event) {
        toast.info("WebSocket error observed");
        console.error("WebSocket error observed: ", event);
      });

    return () => {
      webSocket && webSocket.close();
    };
  }, [webSocket, route]);
  return (
    <Fragment>
      <div className="console_custom p-2">
        <p className="fw-bolder mb-1">Console</p>
        <div className="notification mt-2">
          {notifications &&
            notifications.map((item, idx) => (
              <div key={idx}>
                <p className="note mb-2">{item}</p>
                <div ref={notificationEndRef} id="statusText" />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {})(StatusConsole);
