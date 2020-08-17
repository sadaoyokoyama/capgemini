<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Account;
use App\User;
use App\AccountMovement;
use App\Http\Resources\AccountShowResource;
use App\Http\Resources\AccountMovementsResource;
use App\Http\Resources\AccountBalanceResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    public function show(Request $request, $number)
    {
        $account = Account::where('number', '=', $number)->first();
        
        if (!$account) {
            return response(['message' => 'Account not found.'], 404)
                ->header('Content-Type', 'application/json');
        } 
        
        return new AccountShowResource($account);
    }

    public function move(Request $request, $number)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'type' => [ 'required', Rule::in([-1, 1]) ],
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response(['message' => 'Falha ao validar dados.'], 500)
                ->header('Content-Type', 'application/json');
        } 

        $account = Account::where('number', '=', $number)->first();
        
        if (!$account) {
            return response(['message' => 'Account not found.'], 404)
                ->header('Content-Type', 'application/json');
        }

        $data = $validator->getData();

        if (app('hash')->check($data['password'], $account->password)) {
            $balanceAmount = $account->movements()->sum(\DB::raw('amount * type'));
            
            if ($data['type'] === -1 
                && $data['amount'] > (double) $balanceAmount) {
                
                return response(['message' => 'Saldo insuficiente.'], 401)
                    ->header('Content-Type', 'application/json');
            }
            
            $data['account_id'] = $account->id;
            AccountMovement::create($data);

            return response('Ok', 200);
        }

        return response(['message' => 'Senha inválida.'], 401)
            ->header('Content-Type', 'application/json');
    }

    public function movements(Request $request, $number)
    {
        $account = Account::where('number', '=', $number)->first();

        if (!$account) {
            return response(['message' => 'Account not found.'], 404)
                ->header('Content-Type', 'application/json');
        } 

        if (app('hash')->check($request->password, $account->password)) {
            return AccountMovementsResource::collection($account->movements()->get());
        }

        return response(['message' => 'Unauthorized.'], 401)
            ->header('Content-Type', 'application/json');
    }

    public function balance(Request $request, $number)
    {
        $account = Account::where('number', '=', $number)->first();

        if (!$account) {
            return response(['message' => 'Account not found.'], 404)
                ->header('Content-Type', 'application/json');
        } 

        if (app('hash')->check($request->password, $account->password)) {
            $balanceAmount = $account->movements()->sum(\DB::raw('amount * type'));
            
            return response([
                'balance' => $balanceAmount,
                'account' => $number
                ], 200)->header('Content-Type', 'application/json');
        }

        return response(['message' => 'Unauthorized.'], 401)
            ->header('Content-Type', 'application/json');
    }
}
