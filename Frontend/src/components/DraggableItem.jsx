// DraggableItem.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes"; // Import the ItemTypes

function DraggableItem({ title, category, itemId }) {
  const [, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { title, category, itemId }, // Pass the item details and ID to the drag source
  });

  return (
    <div ref={drag} className="draggable-item">
      {title}
    </div>
  );
}

export default DraggableItem;
