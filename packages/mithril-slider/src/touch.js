/* global Hammer */
import "hammerjs";

export const Touch = ({ el, orientation, onStart, onMove, onEnd }) => {
  const hammer = new Hammer.Manager(el, {});
  hammer.add(new Hammer.Pan({
    direction: orientation === "vertical"
      ? Hammer.DIRECTION_VERTICAL
      : orientation === "all"
        ? Hammer.DIRECTION_ALL
        : Hammer.DIRECTION_HORIZONTAL,
    threshold: 0
  }));
  hammer.on("panstart", onStart);
  hammer.on("panmove", onMove);
  hammer.on("panend", onEnd);

  return {
    destroy: () => {
      hammer.off("panstart", onStart);
      hammer.off("panmove", onMove);
      hammer.off("panend", onEnd);
    }
  };
};