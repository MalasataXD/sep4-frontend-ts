import React from "react";
import { useState, useEffect } from "react";
import "./LivePage.css";
import LiveStats from "../../components/LiveValue/LiveValue";
import EditValues from "../../components/EditValues/EditValues";

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
          <h3>GRAPHS</h3>
        </div>
      </div>
    </div>
  );
}
