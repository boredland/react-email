import { render } from "@react-email/render";
import { Link } from "./index";

describe("render", () => {
  it("renders the <Link> component", () => {
    const actualOutput = render(
      <Link href="https://example.com">Example</Link>,
    );
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><a href=\\"https://example.com\\" style=\\"color:#067df7;text-decoration:none\\" target=\\"_blank\\">Example</a>"',
    );
  });
});
