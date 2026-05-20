export default function Card({ cardPos, image, width = 450, onMouseDown, onTouchStart }) {
  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: "absolute",
        top: cardPos.y,
        left: cardPos.x,
        zIndex: 10,
        width,
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <img
        src={image}
        alt="Note background"
        draggable="false"
        style={{
          width: "100%",
          display: "block",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          right: 24,
          bottom: 24,
          color: "#111",
          pointerEvents: "auto",
        }}
      >
      </div>
    </div>
  );
}
