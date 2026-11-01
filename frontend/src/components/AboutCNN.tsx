const items = [
  { t: "Convolution", d: "Small filters slide over the image to detect edges, textures and shapes." },
  { t: "Pooling", d: "Max pooling shrinks feature maps, keeping the strongest signals." },
  { t: "Fully Connected", d: "Dense layers combine features and softmax outputs 10 class probabilities." },
];

export default function AboutCNN() {
  return (
    <section className="bg-slate-50/70 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold">About the CNN</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Trained on Fashion-MNIST: 60,000 training and 10,000 test images, 28×28 grayscale, 10 classes.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-blue-700">{i.t}</h3>
              <p className="mt-1 text-sm text-slate-600">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
