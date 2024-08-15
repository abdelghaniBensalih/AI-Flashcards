import { Client } from "@gradio/client";

export async function POST(request: Request) {
  const response_0 = await fetch(
    "https://pm1.aminoapps.com/7551/f4ce06bbee3c9f6d23baf4eaec0286a190db140ar1-2048-2048v2_uhq.jpg"
  );
  const exampleImage = await response_0.blob();

  const client = await Client.connect("jp12223/jinhybr-OCR-Donut-CORD");
  const result = await client.predict("/predict", {
    param_0: exampleImage,
  });

  return new Response(JSON.stringify(result.data));
}
