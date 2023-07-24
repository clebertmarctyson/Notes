const Loading = ({ classes }: { classes: string }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={`loading loading-bars ${classes} text-center`}></div>
    </div>
  );
};

export default Loading;
