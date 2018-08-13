import React from "react";
import renderer from "react-test-renderer";
import DropIn from "./index";

describe("DropIn", () => {
	it("Calls dropin.create on instantiation", () => {
		const braintreeWebDropIn = require("braintree-web-drop-in");
		braintreeWebDropIn.create = jest.fn();

		const component = renderer.create(
			<DropIn options={{ authorization: "bogus" }} />
		);

		const passedArgs = braintreeWebDropIn.create.mock.calls[0];
		expect(passedArgs[0].authorization).toEqual("bogus");
	});

	it("Calls teardown on destruction", done => {
		const braintreeWebDropIn = require("braintree-web-drop-in");
		const teardownMock = jest.fn();
		braintreeWebDropIn.create = () =>
			new Promise(resolve => {
				resolve({ teardown: teardownMock });
			});

		const component = renderer.create(
			<DropIn
				options={{ authorization: "bogus" }}
				onInstance={() => {
					component.unmount();
					const callNumber = teardownMock.mock.calls.length;
					expect(callNumber).toEqual(1);
					done();
				}}
			/>
		);
	});
});
