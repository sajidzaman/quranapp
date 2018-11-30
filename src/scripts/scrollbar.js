export const adjustScrollbar = (scrollBar, props, nextProps) => {
  if (nextProps.highlight.highlight < props.highlight.highlight) {
    let scrollValue = scrollBar.getScrollValues().scrollTop;

    const ayahDiv = document.getElementById(
      "ayah_".concat(props.highlight.highlight)
    );
    const transDiv = document.getElementById(
      "trans_ayah_".concat(props.highlight.highlight)
    );

    const ayahDivHeight = ayahDiv !== null ? ayahDiv.offsetHeight : 0;
    const transDivHeight = transDiv !== null ? transDiv.offsetHeight : 0;

    scrollValue += ayahDivHeight + transDivHeight;

    scrollBar.scrollTo(scrollValue);
  }
  if (nextProps.highlight.highlight > props.highlight.highlight) {
    scrollBar.scrollTo(0);
  }
};
