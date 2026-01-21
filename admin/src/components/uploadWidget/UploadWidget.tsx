import { createContext, useEffect, useState } from "react";

// Extend the Window interface to include cloudinary
declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (config: any, callback: (error: any, result: any) => void) => any;
    };
  }
}

interface CloudinaryUploadWidgetProps {
  uwConfig: any; // Adjust the type based on the actual type of uwConfig
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<{loaded: boolean}>({loaded: false});


function UploadWidget({ uwConfig , setImage }: CloudinaryUploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary?.createUploadWidget(
        uwConfig,
        (error: string, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result);
            setImage(result.info.secure_url);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
        style={{border: "none", fontWeight: "bold", marginBottom: "15px"}}
      >
        Telecharger
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
