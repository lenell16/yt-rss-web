import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider as BumbagProvider } from "bumbag";
import { Draqula, DraqulaProvider } from "draqula";

const client = new Draqula(
	"https://gql-rss-parser.lenell16.vercel.app/api/graphql"
);

ReactDOM.render(
	<React.StrictMode>
		<BumbagProvider>
			<DraqulaProvider client={client}>
				<App />
			</DraqulaProvider>
		</BumbagProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
