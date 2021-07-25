import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Kraken from 'kraken';
import './App.css'

const App = () => {
  // Creditos: Jerson Castro, Renzo (Renato) Ugarte e Isaiah (Isaias) Cedano.

  // Face Detect States/Variables
  let convertedImgWidth = window.innerWidth/2;
  while (convertedImgWidth > 450) {
    convertedImgWidth = convertedImgWidth - 1
  }

  const [faceInputField, setFaceInputField] = useState({
    value: ""
  });

  const [convertedUrl, setConvertedUrl] = useState({
    url: ""
  });

  const [detectedFaces, setDetectedFaces] = useState({
    faces: []
  });

  const [foundFaces, setFoundFaces] = useState({
    found: false
  });

  const [findFaces, setFindFaces] = useState({
    find: false
  });
  ///////////////////////////////////////////////////////////////


  // Text To Speech States/Variables
  const [textSpeechInputField, setTextSpeechInputField] = useState({
    value: ""
  });

  const [getSpeechConversion, setSpeechConversion] = useState({
    convert: false
  });
  ///////////////////////////////////////////////////////////////////////////////


  // Text To Speech Functions
  const onTextSpeechInputChange = e => {
    setTextSpeechInputField({
      value: e.target.value
    });
  };

  const convertTextSpeech = () => {
    setSpeechConversion({
      convert: true
    });
  };

  const onTextSpeechKeyPress = e => {
    if (e.which === 13) {
      convertTextSpeech()
    }
  };
  /////////////////////////////////////////////////


  // Face Detect Functions
  const onFaceInputChange = e => {
    setFaceInputField({
      value: e.target.value
    });

    setFindFaces({
      find: false
    });

    setFoundFaces({
      found: false
    });

    setDetectedFaces({
      faces: []
    });

    setConvertedUrl({
      url: ""
    })
  };

  const resizeImage = (imgUrl, imgWidth) => {
    let converted_url = "";
    const kraken = new Kraken({
      api_key: "7a20d22ae0fc8b6315eeff138002a99f",
      api_secret: "08129aaf86f7afc4181618e596167e75a0839788",
    });

    const krakenData = {
      url: imgUrl,
      wait: true,
      resize: {
        width: imgWidth,
        strategy: "landscape"
      }
    };

    kraken.url(krakenData, (err, resp) => {
      if (typeof(resp) !== "undefined") {
        converted_url = resp.kraked_url
      }
    });

    setTimeout(() => {
      setConvertedUrl({
        url: converted_url
      })
    }, 2000)
  };

  const detectFaces = () => {
    resizeImage(faceInputField.value, convertedImgWidth);
    setFindFaces({
      find: true
    })
  };

  const onFaceKeyPress = e => {
    if (e.which === 13) {
      detectFaces()
    }
  };
  //////////////////////////////////////////////////////////////


  useEffect(()=> {
    if (findFaces.find) {
      const faceFormData = new FormData();
      faceFormData.append("api_key", "M-vc3wXc1iAHDKyPURtUYA4ih7vq0Rbt");
      faceFormData.append("api_secret", "57EkRLUPeopzqHNFOk4_Z6ub_vxpySED");
      faceFormData.append("image_url", convertedUrl.url);
      const formDataConfig = {
        method: "POST",
        body: faceFormData,
        redirect: "follow"
      };
      fetch("https://api-us.faceplusplus.com/facepp/v3/detect", formDataConfig)
          .then(resp => resp.text())
          .then(data => {
            const faces = JSON.parse(data).faces.map((data_Face) => {
              const {face_rectangle} = data_Face;
              return face_rectangle
            });

            setDetectedFaces({
              faces: faces
            });

            setFoundFaces({
              found: true
            });

            setFindFaces({
              find: false
            });

          })
          .catch(err => {
            alert("Algo ocurrio! Vuelve a intentar con otro imagen url")
          })
    }
    // eslint-disable-next-line
  }, [convertedUrl]);

    return (
      <Router>
        <Navigation />
        <div className="page-item container-fluid container_exp">
          <div className="container my-4">
            <div className="text-center">
              <h3 className="card-title tittle-register">Bienvenido</h3>
            </div>
          </div>

          <div className="card">
            <table className="table table-hover text-center">
              <thead>
              <tr>
                <th scope="col">Detector de Rostros</th>
                <th scope="col">Texto a Declaracion</th>
              </tr>
              </thead>

              <tr>
                <th scope="col" >
                  <input type="text" onChange={onFaceInputChange}
                         onKeyPress={onFaceKeyPress}
                         className="form-control" placeholder="Url del imagen">
                  </input>
                </th>
                <th scope="col">
                  <input type="text" onChange={onTextSpeechInputChange}
                         onKeyPress={onTextSpeechKeyPress}
                         className="form-control" placeholder="Ingrese texto">
                  </input>
                </th>
              </tr>
              <br/>
              <tr>
                <th>
                  <button type="button" className="btn btn-secondary"
                          onClick={detectFaces}>Detectar</button>
                  {
                    foundFaces.found ?
                        <FaceRecognition imageUrl={convertedUrl.url} boxes={detectedFaces.faces}/> :
                        null
                  }
                </th>
                <button type="button" className="btn btn-secondary" onClick={convertTextSpeech}>Convertir</button>
                {
                  getSpeechConversion.convert ?
                      <video src={`http://api.voicerss.org/?key=e4ddc02d04fa4203ba1a492a9d55e62e&hl=es-es&f=48khz_16bit_stereo&src=${textSpeechInputField.value}`}
                             autoPlay={true} onEnded={() => {
                        setSpeechConversion({
                          convert: false
                        });
                      }} className={'absolute'}/> :
                      null
                }
                <br/>
              </tr>
            </table>
          </div>
        </div>
      </Router>
  );
};


export default App;