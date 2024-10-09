import { SplashScreen } from '@capacitor/splash-screen';
import base64_decode from "locutus/php/url/base64_decode";
import { BluetoothPrinter } from '@kduma-autoid/capacitor-bluetooth-printer';
import {WebViewWatchDog} from "@kduma-autoid/capacitor-webview-watchdog";

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();
      WebViewWatchDog.ping();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>@kduma-autoid/capacitor-bluetooth-printer</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          <button class="button" id="list">list()</button>
          <hr>
          <div id='connect_devices' style='display: inline'></div>
          <hr>
          <button class="button" id="print">print()</button>
          <button class="button" id="disconnect">disconnect()</button>
          <hr>
          <div id='print_devices'></div>
          
        </p>
        <h2>Demo Events</h2>
        <p id="output"></p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;


      self.shadowRoot.querySelector('#print').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const encodedData = "G0AbYQEdIRJ7e3BsYW4ubmFtZX19Ch0hERshABtFAUludGVybmV0IEFjY2VzcyBDYXJkCh0hABtFAAobYQBQbGFuIElEOiB7e3BsYW4uaWR9fQpOYW1lOiB7e3BsYW4ubmFtZX19CkRlc2NyaXB0aW9uOiB7e3BsYW4uZGVzY3JpcHRpb259fQpEZXZpY2VzOiB7e3BsYW4udXNlX2xpbWl0fX0KVGltZToge3twbGFuLnZhbGlkX21pbnV0ZXN9fQpEYXRhOiB7e3BsYW4uZGF0YV9xdW90YX19ClVwbG9hZDoge3twbGFuLnVwbG9hZF9zcGVlZH19CkRvd25sb2FkOiB7e3BsYW4uZG93bmxvYWRfc3BlZWR9fQobYQEKVG8gdXNlIGludGVybmV0LCBwbGVhc2UgY29ubmVjdAp0byBXaUZpIG5ldHdvcmsgbmFtZWQ6CgobRQEdQgEdIRF7e3dpZml9fQodIQAdQgAbRQAKd2hlbiB5b3Ugd2lsbCBiZSByZWRpcmVjdGVkIHRvCmNhcHRpdmUgcG9ydGFsIG9yIGxvZ2luIHNjcmVlbiwKZW50ZXIgeW91ciB2b3VjaGVyIGNvZGU6CgodIRIbRQEdQgF7e2NvZGV9fQodQgAbRQAbIQAKUGxlYXNlIGFjdGl2YXRlIHZvdWNoZXIgYmVmb3JlOgobRQF7e2V4cGlyZXN9fQobRQAKe3tpZH19CgoKHVZCAw==";
          const printout = base64_decode(encodedData);
          const data = await BluetoothPrinter.print({ data: printout });
          output.innerHTML = "<b>print():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>print() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });
      self.shadowRoot.querySelector('#disconnect').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await BluetoothPrinter.disconnect();
          output.innerHTML = "<b>disconnect():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>disconnect() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });
      self.shadowRoot.querySelector('#list').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        const connect_devices = self.shadowRoot.querySelector('#connect_devices');
        const print_devices = self.shadowRoot.querySelector('#print_devices');
        try {
          const data = await BluetoothPrinter.list();
          output.innerHTML = "<b>list():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;

          connect_devices.innerHTML = "";
          print_devices.innerHTML = "";
          for (const devicesKey in data.devices) {
            const devices = data.devices[devicesKey];
            const button = document.createElement('button');
            button.innerHTML = 'connect('+devices.name+')'
            button.className = 'button';
            button.addEventListener('click', async function (e) {
              try {
                const data = await BluetoothPrinter.connect({ address: devices.address });
                output.innerHTML = "<b>connect("+devices.address+"):</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
              } catch (error) {
                output.innerHTML = "<b>connect("+devices.address+") - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
              }
            });
            connect_devices.appendChild(button);

            const button2 = document.createElement('button');
            button2.innerHTML = 'connectAndPrint('+devices.name+')';
            button2.className = 'button';
            button2.addEventListener('click', async function (e) {
              try {
                const encodedData = "G0AbYQEdIRJ7e3BsYW4ubmFtZX19Ch0hERshABtFAUludGVybmV0IEFjY2VzcyBDYXJkCh0hABtFAAobYQBQbGFuIElEOiB7e3BsYW4uaWR9fQpOYW1lOiB7e3BsYW4ubmFtZX19CkRlc2NyaXB0aW9uOiB7e3BsYW4uZGVzY3JpcHRpb259fQpEZXZpY2VzOiB7e3BsYW4udXNlX2xpbWl0fX0KVGltZToge3twbGFuLnZhbGlkX21pbnV0ZXN9fQpEYXRhOiB7e3BsYW4uZGF0YV9xdW90YX19ClVwbG9hZDoge3twbGFuLnVwbG9hZF9zcGVlZH19CkRvd25sb2FkOiB7e3BsYW4uZG93bmxvYWRfc3BlZWR9fQobYQEKVG8gdXNlIGludGVybmV0LCBwbGVhc2UgY29ubmVjdAp0byBXaUZpIG5ldHdvcmsgbmFtZWQ6CgobRQEdQgEdIRF7e3dpZml9fQodIQAdQgAbRQAKd2hlbiB5b3Ugd2lsbCBiZSByZWRpcmVjdGVkIHRvCmNhcHRpdmUgcG9ydGFsIG9yIGxvZ2luIHNjcmVlbiwKZW50ZXIgeW91ciB2b3VjaGVyIGNvZGU6CgodIRIbRQEdQgF7e2NvZGV9fQodQgAbRQAbIQAKUGxlYXNlIGFjdGl2YXRlIHZvdWNoZXIgYmVmb3JlOgobRQF7e2V4cGlyZXN9fQobRQAKe3tpZH19CgoKHVZCAw==";
                const printout = base64_decode(encodedData);
                const data = await BluetoothPrinter.connectAndPrint({ address: devices.address, data: printout });
                output.innerHTML = "<b>connectAndPrint("+devices.address+"):</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
              } catch (error) {
                output.innerHTML = "<b>connectAndPrint("+devices.address+") - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
              }
            });
            print_devices.appendChild(button2);
          }
        } catch (error) {
          connect_devices.innerHTML = "";
          print_devices.innerHTML = "";
          output.innerHTML = "<b>list() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
