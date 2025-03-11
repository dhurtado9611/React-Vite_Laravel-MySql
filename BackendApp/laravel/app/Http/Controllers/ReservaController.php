<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function index()
    {
        return Reserva::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ]);

        $reserva = Reserva::create($request->all());

        return response()->json($reserva, 201);
    }

    public function show($id)
    {
        return Reserva::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->update($request->all());

        return response()->json($reserva, 200);
    }

    public function destroy($id)
    {
        Reserva::destroy($id);

        return response()->json(null, 204);
    }
}
