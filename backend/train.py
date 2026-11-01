"""Train a stronger CNN on Fashion-MNIST and save it to model/fashion_cnn.keras."""
import os

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, models

os.makedirs("model", exist_ok=True)

tf.keras.utils.set_random_seed(42)

# 1. Load data, normalize to 0-1, add channel dimension -> (N, 28, 28, 1)
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.fashion_mnist.load_data()
x_train = (x_train / 255.0).astype("float32").reshape(-1, 28, 28, 1)
x_test = (x_test / 255.0).astype("float32").reshape(-1, 28, 28, 1)

# 2. Lightweight data augmentation to improve generalization on small grayscale images
augmentation = models.Sequential([
    layers.RandomRotation(0.12, fill_mode="nearest"),
    layers.RandomZoom(0.10, fill_mode="nearest"),
    layers.RandomTranslation(0.08, 0.08, fill_mode="nearest"),
], name="augmentation")

# 3. Stronger CNN architecture
inputs = layers.Input(shape=(28, 28, 1))
x = augmentation(inputs)

x = layers.Conv2D(32, 3, padding="same", activation="relu", kernel_initializer="he_normal")(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(2)(x)

x = layers.Conv2D(64, 3, padding="same", activation="relu", kernel_initializer="he_normal")(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(2)(x)

x = layers.Conv2D(128, 3, padding="same", activation="relu", kernel_initializer="he_normal")(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(2)(x)

x = layers.Flatten()(x)
x = layers.Dense(128, activation="relu", kernel_regularizer=tf.keras.regularizers.l2(1e-4))(x)
x = layers.Dropout(0.35)(x)
outputs = layers.Dense(10, activation="softmax")(x)

model = models.Model(inputs, outputs)
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)
model.summary()

# 4. Training callbacks for better convergence and overfitting control
callbacks = [
    tf.keras.callbacks.ReduceLROnPlateau(
        monitor="val_loss", factor=0.5, patience=3, min_lr=1e-5, verbose=1
    ),
    tf.keras.callbacks.EarlyStopping(
        monitor="val_accuracy", patience=6, restore_best_weights=True, verbose=1
    ),
]

# 5. Train with a more stable setup
history = model.fit(
    x_train,
    y_train,
    epochs=20,
    batch_size=128,
    validation_split=0.1,
    callbacks=callbacks,
    verbose=1,
)

# 6. Evaluate and save
_, acc = model.evaluate(x_test, y_test, verbose=0)
print(f"\nTest accuracy: {acc * 100:.2f}%")
model.save("model/fashion_cnn.keras")

# 7. Plot history
fig, ax = plt.subplots(1, 2, figsize=(10, 4))
for a, m in zip(ax, ["accuracy", "loss"]):
    a.plot(history.history[m], label="train")
    a.plot(history.history["val_" + m], label="validation")
    a.set_title(m.capitalize())
    a.set_xlabel("Epoch")
    a.legend()
plt.tight_layout()
plt.savefig("model/training_history.png")
print("Saved model and training plot in backend/model/")
