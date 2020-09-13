import React, { useState } from "react";
import * as R from "ramda";
import {
	Group,
	Image,
	Box,
	Set,
	Stack,
	Heading,
	Paragraph,
	Link,
	Button,
	InputField,
	Spinner,
	Container,
} from "bumbag";
import { Formik, Form, Field } from "formik";
import { useQuery } from "draqula";
import gql from "graphql-tag";

const FEEDS_QUERY = gql`
	query Feeds($urls: [String!]!) {
		feeds(urls: $urls) {
			id
			title
			items {
				id
				title
				image
				link
			}
		}
	}
`;

function LinkCard({ title, link, channel, image }) {
	return (
		<Link href={link} _hover={{ textDecoration: "none" }} fontWeight="400">
			<Group
				backgroundColor="background"
				altitude="300"
				borderRadius="4"
				orientation="vertical"
				width="300px"
			>
				<Image width="300px" height="225px" src={image} />
				<Stack spacing="major-1" padding="major-2">
					<Heading use="h6" marginBottom="minor-">
						{title}
					</Heading>
					<Paragraph color="text100" fontSize="100">
						{channel}
					</Paragraph>
				</Stack>
			</Group>
		</Link>
	);
}

function App() {
	const [url, setUrl] = useState(
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCIyIoM_Nd8HtY19fuR_ov2A"
	);
	const { data, error, isLoading } = useQuery(FEEDS_QUERY, {
		urls: [
			url,
			"https://www.youtube.com/feeds/videos.xml?channel_id=UC-lHJZR3Gqxm24_Vd_AJ5Yw",
		],
	});

	return (
		<Container padding="major-4">
			{error && <span>Error: {error.message}</span>}
			<Stack>
				<Formik initialValues={{ url }} onSubmit={(data) => setUrl(data.url)}>
					<Form>
						<Stack orientation="horizontal">
							<Field component={InputField.Formik} name="url" />
							<Button palette="primary" type="submit">
								Get Feed
							</Button>
						</Stack>
					</Form>
				</Formik>
				{isLoading && <Spinner size="large" />}
				{data && (
					<Set spacing="major-4">
						{data.feeds.map((feed) =>
							feed.items.map((item) => (
								<LinkCard
									key={item.id}
									title={item.title}
									link={item.link}
									channel={feed.title}
									image={item.image}
								/>
							))
						)}
					</Set>
				)}
			</Stack>
		</Container>
	);
}

export default App;
