import React from "react";
import { useState, useEffect } from "react";
import "./LivePage.css";
import LiveStats from "../../components/LiveValue/LiveValue";
import EditValues from "../../components/EditValues/EditValues";
import LiveGraph from "../../components/LiveGraph/LiveGraph";

export default function LivePage() {
  return (
    <div className="LivePage">
      <div className="LiveStats">
        <LiveStats></LiveStats>
      </div>

      <div className="editValues-graphs-Container">
        <div className="EditValues">
          <EditValues></EditValues>
        </div>
        <div className="graphs">
          <LiveGraph></LiveGraph>
        </div>
      </div>
    </div>
  );
}
