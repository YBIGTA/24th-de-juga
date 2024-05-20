import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import pickle

# Define the GRU model class (same as used for training)
class GRU(nn.Module):
    def __init__(self, num_classes, input_size, hidden_size, num_layers, seq_length):
        super(GRU, self).__init__()
        self.num_classes = num_classes
        self.num_layers = num_layers
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.seq_length = seq_length

        self.gru = nn.GRU(input_size=input_size, hidden_size=hidden_size,
                          num_layers=num_layers, batch_first=True)
        self.fc_1 = nn.Linear(hidden_size, 128)
        self.fc = nn.Linear(128, num_classes)
        self.relu = nn.ReLU()

    def forward(self, x):
        h_0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        output, hn = self.gru(x, h_0)
        out = self.relu(output[:, -1, :])
        out = self.fc_1(out)
        out = self.relu(out)
        out = self.fc(out)
        return out

# Function for inference
def predict_next_close(df, model_path, scaler_path):
    if len(df) != 7:
        raise ValueError("Input DataFrame must have exactly 7 rows")
    
    # Load the scaler
    with open(scaler_path, 'rb') as f:
        scaler = pickle.load(f)
    
    # Load the model
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = GRU(num_classes=1, input_size=df.shape[1], hidden_size=64, num_layers=4, seq_length=7)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    
    # Ensure the DataFrame columns are in the correct order
    df = df[['open', 'high', 'low', 'close', 'volume']]
    
    # Scale the input data
    scaled_data = scaler.transform(df)
    
    # Convert to tensor
    inputs = torch.tensor(scaled_data, dtype=torch.float32).unsqueeze(0).to(device)
    
    # Perform inference
    with torch.no_grad():
        output = model(inputs)
    
    # Inverse transform the prediction
    prediction = output.cpu().numpy().reshape(-1, 1)
    prediction_full = np.zeros((1, scaled_data.shape[1]))
    prediction_full[:, -1] = prediction
    predicted_close = scaler.inverse_transform(prediction_full)[:, -1]
    
    return predicted_close[0]

############## Example usage!!!! for Mok #################

example_df = pd.DataFrame({
    'high': [1, 2, 3, 4, 5, 6, 7],
    'low': [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5],
    'open': [0.8, 1.8, 2.8, 3.8, 4.8, 5.8, 6.8],
    'volume': [100, 200, 300, 400, 500, 600, 700],
    'close': [1, 2, 3, 4, 5, 6, 7]
})

# Example paths
model_path = '/root/Personal/24th-de-juga/model/GRU.pth'
scaler_path = '/root/Personal/24th-de-juga/model/scaler_GRU.pkl'

predicted_close = predict_next_close(example_df, model_path, scaler_path)
print(f"Predicted close price: {predicted_close}")
