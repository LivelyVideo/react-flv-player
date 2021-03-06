import React, { Component } from 'react';
import flvjs from 'flv.js';
import PropTypes from 'prop-types';


class ReactFlvPlayer extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.flvPlayerRef = element => {
      this.flvPlayerRef = element;
    };
  }

  componentDidMount() {

    const {type , url, isLive, enableStashBuffer, stashInitialSize, hasAudio, hasVideo, handleError, enableWarning, enableError} = this.props;

    // 组件挂载后，拿到Ref进行操作
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type,
        isLive,
        url,
        hasAudio,
        hasVideo
      },{
        enableStashBuffer,
        stashInitialSize
      });


      flvjs.LoggingControl.enableError = false;
      flvjs.LoggingControl.enableWarn = enableWarning;

      flvPlayer.attachMediaElement(this.myRef.current); // 将这个DOM付给第三方库
      flvPlayer.load();
      flvPlayer.play();
      flvPlayer.on('error', (err)=>{
        // console.log(err);
        handleError(err);
      });
    }
  }

  render() {
    const { height, width, isMuted,showControls } = this.props;
    return (
      <div>
        <video
          controls={showControls}
          muted={{isMuted}}
          ref={this.myRef}
          style={{height, width}}
        />
      </div>
    );
  }
}

ReactFlvPlayer.propTypes = {
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
  isLive: PropTypes.bool,
  showControls: PropTypes.bool,
  hasAudio: PropTypes.bool,
  hasVideo: PropTypes.bool,
  enableStashBuffer: PropTypes.bool,
  stashInitialSize: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  isMuted: PropTypes.bool,
  enableWarning: PropTypes.bool,
  enableError: PropTypes.bool,
  handleError: PropTypes.func
};

ReactFlvPlayer.defaultProps = {
  type: 'flv',
  isLive: true,
  hasAudio: true,
  hasVideo: true,
  showControls: true,
  enableStashBuffer: true,
  stashInitialSize: 128,
  height: '100%',
  width: '100%',
  isMuted: false,
  handleError: (err)=>{console.log(err)},
  enableWarning: false,
  enableError: false
};

export default ReactFlvPlayer;
