import { render } from "@testing-library/react";

import <%= className %> from "./<%= fileName %>";

describe("<%= className %>", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<<%= className %> />);
    expect(baseElement).toBeTruthy();
  });
});
