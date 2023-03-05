package dev.duma.capacitor.bluetoothprinter;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.PendingIntent;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.core.app.ActivityCompat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.OutputStream;
import java.util.Set;
import java.util.UUID;

public class BluetoothPrinter {
    BluetoothAdapter mBluetoothAdapter;
    private final UUID applicationUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private BluetoothSocket mBluetoothSocket;
    BluetoothDevice mBluetoothDevice;

    @SuppressLint("MissingPermission")
    public JSONArray list(Context context) throws RuntimeException, JSONException {
        JSONArray pairedDevices = new JSONArray();

        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        Set<BluetoothDevice> mPairedDevices = mBluetoothAdapter.getBondedDevices();

        for (BluetoothDevice mDevice : mPairedDevices) {
            JSONObject device = new JSONObject();
            device.put("name", mDevice.getName());
            device.put("address", mDevice.getAddress());
            int type = mDevice.getType();
            switch (type) {
                default:
                case BluetoothDevice.DEVICE_TYPE_UNKNOWN:
                    device.put("type", "unknown");
                    break;
                case BluetoothDevice.DEVICE_TYPE_CLASSIC:
                    device.put("type", "classic");
                    break;
                case BluetoothDevice.DEVICE_TYPE_LE:
                    device.put("type", "le");
                    break;
                case BluetoothDevice.DEVICE_TYPE_DUAL:
                    device.put("type", "dual");
                    break;
            }
            pairedDevices.put(device);
        }

        return pairedDevices;
    }

    @SuppressLint("MissingPermission")
    public void connect(Context context, String address) throws RuntimeException {
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);

        try {
            mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(applicationUUID);
            mBluetoothSocket.connect();

            int counter = 0;
            while (!mBluetoothSocket.isConnected()) {
                counter++;
                if (counter > 15) {
                    throw new RuntimeException("Could not connect to printer");
                }
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Could not connect to printer", e);
        }
    }

    public void print(String data) throws RuntimeException {
        try {
            OutputStream stream = mBluetoothSocket.getOutputStream();
            stream.write(data.getBytes());
            stream.flush();
        } catch (Exception e) {
            throw new RuntimeException("Could not print", e);
        }
    }

    public void disconnect() throws RuntimeException {
        try {
            mBluetoothSocket.close();
        } catch (Exception e) {
            throw new RuntimeException("Could not disconnect from printer", e);
        }
    }
}
