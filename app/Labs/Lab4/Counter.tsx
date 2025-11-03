import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <div className="d-flex gap-2 mt-2">
        <Button
          variant="success"
          onClick={() => setCount(count + 1)}
          id="wd-counter-up-click"
        >
          Up
        </Button>
        <Button
          variant="danger"
          onClick={() => setCount(count - 1)}
          id="wd-counter-down-click"
        >
          Down
        </Button>
      </div>
      <hr />
    </div>
  );
}
