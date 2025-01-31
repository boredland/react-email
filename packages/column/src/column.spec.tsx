import { render } from "@react-email/render";
import { Column } from "./index";

describe("render", () => {
  it("renders the <Column> component", () => {
    const actualOutput = render(<Column>Lorem ipsum</Column>);
    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><td data-id=\\"__react-email-column\\">Lorem ipsum</td>"`,
    );
  });
});
