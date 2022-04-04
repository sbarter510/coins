export const convertToCurrency = (value, currency) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
};

// format default api key names for display on front end

export const formatKeys = (key) => {
  let firstWord = true;
  key = key.replaceAll("_", " ");
  key = key.charAt(0).toUpperCase() + key.slice(1);
  if (key.split(" ").length > 1) {
    key = key.split(" ").map((word) => {
      if (!firstWord) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      firstWord = false;
      return " " + word;
    });
  }
  return key;
};

export const posOrNegColor = (number) => {
  let color = Number(number) > 0 ? { color: "green" } : { color: "red" };
  return color;
};

export const upOrDownArrow = (num, comparison = null) => {
  if (!comparison) {
    if (Number(num) > 0) {
      return (
        <span className="material-icons md-36" style={posOrNegColor(num)}>
          arrow_upward
        </span>
      );
    } else {
      <span className="material-icons md-36" style={posOrNegColor(num)}>
        arrow_downward
      </span>;
    }
  } else {
    if (num - comparison > 0) {
      return (
        <span
          className="material-icons md-36"
          style={posOrNegColor(num - comparison)}
        >
          arrow_upward
        </span>
      );
    } else {
      return (
        <span
          className="material-icons md-36"
          style={posOrNegColor(num - comparison)}
        >
          arrow_downward
        </span>
      );
    }
  }
};
