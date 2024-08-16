import { Client } from "@gradio/client";

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image") as File;

  const imageReader = image.stream().getReader();
  const { value } = await imageReader.read();
  const blob = new Blob([value!]);

  const client = await Client.connect("jp12223/jinhybr-OCR-Donut-CORD");
  const result = await client.predict("/predict", {
    param_0: blob,
  });

  return new Response(JSON.stringify(result.data));
}
