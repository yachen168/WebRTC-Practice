export const listDevices = async ({ kind }) => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    alert("不支援 enumerateDevices()");
    return;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log("devices", devices);
    const specificDevices = devices
      .filter((device) => device.kind === kind)
      .map((item, index) => ({
        deviceId: item.deviceId,
        groupId: item.groupId,
        kind: item.kind,
        label: item.label,
      }));

    return specificDevices;
  } catch (error) {
    alert("UpdateWebcamDevices error: ", error);
  }
};
