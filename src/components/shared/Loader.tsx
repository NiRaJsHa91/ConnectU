
const Loader = ({height, width}:{height:number | string, width:number | string}) => {
  return (
    <div className="flex-center">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        height={height}
        width={width}
      />
    </div>
  );
}

export default Loader
