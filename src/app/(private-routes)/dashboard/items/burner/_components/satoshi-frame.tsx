import Image from 'next/image';

const SatoshiFrame = ({ frames, interval = 0 }) => {
  const frame = frames[(interval + 1) % frames.length];
  return (
    <Image
      src={frame}
      alt={`Machine Frame: ${frame}`}
      className="pixelated"
      width={316}
      height={303}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 504,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '316px',
        height: 'auto',
      }}
    />
  );
};

export default SatoshiFrame;