const MachineFrame = ({ frames, interval = 0 }) => {
  const frame = frames[(interval + 1) % frames.length];
  return (
    <img
      src={frame}
      alt={`Machine Frame: ${frame}`}
      className="pixelated"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '550px',
        maxWidth: '90%',
        height: 'auto',
      }}
    />
  );
};

export default MachineFrame;
