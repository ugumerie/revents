import React, {Component, createRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 

// const cropper = React.createRef(null);

class CropperInput extends Component {
    cropper = createRef(null)

    cropImage = () => {
      const {setImage} = this.props
      if(typeof this.cropper.current.getCroppedCanvas() === 'undefined'){
        return
      }

      this.cropper.current.getCroppedCanvas().toBlob(blob => {
        setImage(blob)
      }, 'image/jpeg')
    }

  render() {
    const {imagePreview} = this.props

    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{height: 200, width: '100%'}}
        preview='.img-preview'// create a div with this class - the img is previewed there
        aspectRatio={1}
        viewMode={1}//this will stop the user from cropping outside the img
        dragMode='move'//allow the user to move img around the crop box
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage} />
    );
  }
}

export default CropperInput