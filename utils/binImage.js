const binImage = (bin) => {
  bin.fileName = `${process.env.NEXT_PUBLIC_ASSET_ROOT}${bin.fileName}`;
  if (bin.presentTwinFileName) {
    bin.presentTwinFileName = `${process.env.NEXT_PUBLIC_ASSET_ROOT}${bin.presentTwinFileName}`;
  }
  return bin;
};

export default binImage;
