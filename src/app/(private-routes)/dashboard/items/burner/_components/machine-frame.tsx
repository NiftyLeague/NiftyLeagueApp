import Image from 'next/image';

const MachineFrame = ({ frames, interval = 0 }) => {
  const frame = frames[(interval + 1) % frames.length];
  return (
    <Image
      src={frame}
      alt={`Machine Frame: ${frame}`}
      width={550}
      height={1425}
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
