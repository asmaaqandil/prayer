

 

  const Prayer = ({ name, time, playAzan }) => {
    return (
      <div className="prayer">
        <p className="name-prayer">{name}</p>
        <p className="time-prayer">
          {time}
        
          <button onClick={() => playAzan("/sounds/azan5.mp3")}>
          <i class="fas fa-microphone" id="microphoneIcon"></i>
        </button>
        </p>
      </div>
    );
  };
  
  export default Prayer;
  






