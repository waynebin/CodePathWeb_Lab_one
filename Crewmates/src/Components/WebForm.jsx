import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import "../Style_CSS/WebForm.css";
import supabase from "../Client";

const attributeOptions = {
  Color:   ["black", "white", "yellow"],
  BodyType:["offRoad", "classic", "oldschool"],
  Engine:  ["V4", "V6", "V8"],
  Tires:   ["onRoad", "allTerrain", "mud"],
  Seats:   ["2‑seater", "4‑seater", "7‑seater"],
  Size:    ["compact", "mid", "full"],
  Model:   ["Sport", "Touring", "Luxury"],
};

export default function WebForm() {
  const [crew, setCrew] = useState([]);
  const [newCrew, setNewCrew] = useState("");
  const [selected, setSelected] = useState(
    Object.fromEntries(Object.keys(attributeOptions).map((k) => [k, ""]))
  );

  // 1) Fetch existing rows
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("CrewMateList")
        .select(
          [
            "id",
            "crew_name",
            ...Object.keys(attributeOptions),
          ].join(",")
        );

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setCrew(data);
      }
    })();
  }, []);

  // 2) Handle radio buttons
  const handleRadioChange = (attr, val) =>
    setSelected((prev) => ({ ...prev, [attr]: val }));

  // 3) Insert a new row
  const handleSubmit = async (e) => {
    e.preventDefault();

    const row = {
      crew_name: newCrew,
      ...selected,    // spreads into { Color, BodyType, … }
    };

    const { data, error } = await supabase
      .from("CrewMateList")
      .insert([row])
      .single();      // returns one object in `data`

    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    setCrew((prev) => [...prev, data]);
    setNewCrew("");
    setSelected(Object.fromEntries(Object.keys(attributeOptions).map((k) => [k, ""])));
  };

  return (
    <div className="web-form-container">
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>

      <form className="web-form" onSubmit={handleSubmit}>
        <label>
          Crew Name:
          <input
            type="text"
            value={newCrew}
            onChange={(e) => setNewCrew(e.target.value)}
            required
          />
        </label>

        {Object.entries(attributeOptions).map(([attr, opts]) => (
          <fieldset key={attr} className="attribute-fieldset">
            <legend>{attr}</legend>
            {opts.map((opt) => (
              <label key={opt} className="radio-label">
                <input
                  type="radio"
                  name={attr}
                  value={opt}
                  checked={selected[attr] === opt}
                  onChange={() => handleRadioChange(attr, opt)}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </fieldset>
        ))}

        <button type="submit">Submit</button>
      </form>

      {crew.length > 0 && (
        <section className="crew-list">
          <h2>Created Crews</h2>
          <ul>
            {crew.map((c) => (
              <li key={c.id}>
                <strong>{c.crew_name}</strong>
                <ul>
                  {Object.keys(attributeOptions).map((k) => (
                    <li key={k}>
                      {k}: {c[k] || "—"}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
