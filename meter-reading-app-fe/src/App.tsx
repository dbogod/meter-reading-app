import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '@Screens/home'
import NotFound from '@Screens/not-found'
import Login from '@Screens/login'
import AddMeterReading from '@Screens/meter-readings/AddMeterReading'
import MeterReadingsList from '@Screens/meter-readings/MeterReadings'
import NavBar from '@Components/nav-bar'
import PrivateRoutes from '@Components/PrivateRoutes'

import { ROOT_PATHS } from '@Types/routes'

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path={ROOT_PATHS.METER_READINGS}
              element={<MeterReadingsList />}
            />
            <Route
              path={ROOT_PATHS.ADD_METER_READING}
              element={<AddMeterReading />}
            />
          </Route>

          <Route path={ROOT_PATHS.HOME} element={<Home />} index />
          <Route path={ROOT_PATHS.LOGIN} element={<Login />} />
          <Route path={ROOT_PATHS.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
