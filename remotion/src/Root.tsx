import { Composition } from "remotion";
import { PODeskPromo, videoConfig } from "./Composition";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="PODeskPromo"
    component={PODeskPromo}
    width={videoConfig.width}
    height={videoConfig.height}
    fps={videoConfig.fps}
    durationInFrames={videoConfig.durationInFrames}
  />
);
