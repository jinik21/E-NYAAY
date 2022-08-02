import React, { useState, useEffect } from "react";
import factory from "../ethereum/factory";
import moibit from "../config/axios";
import {
  encryptWithPublicKey,
  decryptWithPrivateKey,
  cipher,
  hash,
} from "eth-crypto";

function Blockchain() {
  const [file, setFile] = useState(null);
  const [encryptedFileString, setEncryptedFileString] = useState("");
  const pubKey =
    "68b29ea4ef0d39bc5e02d3c685846154ba768b195eb67a8ec15773a9190b4248435c3f2c4ecde74be4f5d82548a3f738074dc3d09537240485430e47d04f2585";
  const privateKey =
    "0x8b3cfe427461256c53fa8d12b5fe71de36864d1c1b8f8834d565d5a1a079a948";
  const uploadFile = async () => {
    let formData = new FormData();

    const string = JSON.stringify(encryptedFileString);
    const blob = new Blob([string], { type: "text/plain" });
    const file = new File([blob], "vishal", { type: "text/plain" });
    formData.append("file", file);
    formData.append("fileName", "vishal");
    const { data } = await moibit.post("/writefile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
  };
  const convertBase64toBlob = (content, contentType) => {
    contentType = contentType || "";
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType,
    });
    return blob;
  };
  const downloadBlob = (blob) => {
    const url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.style = "display:none";
    a.download = "downloadedFile";
    a.click();
    document.location.reload();
  };
  const getFile = async () => {
    const { data } = await moibit.post("/readfile", {
      fileName: "vishal",
      version: 1,
    });
    const encryptedObject = cipher.parse(data);
    decryptData(privateKey, encryptedObject).then((data) => {
      const blob = convertBase64toBlob(JSON.parse(data), "image/png");
      downloadBlob(blob);
    });
  };
  const readFile = (e) => {
    const file = e.target.files[0];
    const type = file.type;
    console.log(type);
    var reader = new FileReader();
    reader.onload = (e) => {
      const base64data = window.btoa(e.target.result);
      console.log("Base 64 string: ", base64data);
      encryptData(pubKey, base64data).then((encoded) => {
        const encryptString = cipher.stringify(encoded);
        setEncryptedFileString(encryptString);
      });
    };
    reader.readAsBinaryString(file);
  };

  const encryptData = (publicKey, message) => {
    return encryptWithPublicKey(publicKey, JSON.stringify(message));
  };
  const decryptData = (privateKey, encryptedMessage) => {
    return decryptWithPrivateKey(privateKey, encryptedMessage);
  };
  return (
    <div>
      <input type="file" onChange={(e) => readFile(e)} required />
      <button onClick={() => uploadFile()}>click me</button>
      <button onClick={() => getFile()}>click to get file</button>
    </div>
  );
}

export default Blockchain;
