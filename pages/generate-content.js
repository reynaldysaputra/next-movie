import Layout from "../components/layout";
import faker from 'faker';

export default function GenerateContent(params) {
  const addContent = async () => {
    for (let i = 0; i < 100; i++) {
      const generate = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs()
        })
      })

      const generateResponse = await generate.json();

      console.log(generateResponse);
    }
  }

  return(
    <Layout title='Generate content - Next Movies'>
      <button onClick={addContent}>Generate Strapi Content</button>
    </Layout>
  )
}