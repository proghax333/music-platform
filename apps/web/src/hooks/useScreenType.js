import { useMediaQuery } from "@uidotdev/usehooks";

export const useScreenType = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );

  if (isSmallDevice) return "small";
  if (isMediumDevice) return "medium";
  if (isLargeDevice) return "large";

  return "extra-large";
};
